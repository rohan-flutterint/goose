use anyhow::{Context, Result};
use std::fs;
use std::path::PathBuf;
use tracing_appender::rolling::Rotation;
use tracing_subscriber::{
    filter::LevelFilter, fmt, layer::SubscriberExt, util::SubscriberInitExt, EnvFilter, Layer,
    Registry,
};

use goose::tracing::langfuse_layer;

/// Returns the directory where log files should be stored.
/// Creates the directory structure if it doesn't exist.
fn get_log_directory() -> Result<PathBuf> {
    let home = std::env::var("HOME").context("HOME environment variable not set")?;
    let base_log_dir = PathBuf::from(home)
        .join(".config")
        .join("goose")
        .join("logs")
        .join("cli"); // Add cli-specific subdirectory

    // Create date-based subdirectory
    let now = chrono::Local::now();
    let date_dir = base_log_dir.join(now.format("%Y-%m-%d").to_string());

    // Ensure log directory exists
    fs::create_dir_all(&date_dir).context("Failed to create log directory")?;

    Ok(date_dir)
}

/// Sets up the logging infrastructure for the application.
/// This includes:
/// - File-based logging with JSON formatting (DEBUG level)
/// - Console output for development (INFO level)
/// - Optional Langfuse integration (DEBUG level)
pub fn setup_logging(session_name: Option<&str>) -> Result<()> {
    // Set up file appender for goose module logs
    let log_dir = get_log_directory()?;
    let timestamp = chrono::Local::now().format("%Y%m%d_%H%M%S").to_string();

    // Create non-rolling file appender for detailed logs
    let file_appender = tracing_appender::rolling::RollingFileAppender::new(
        Rotation::NEVER,
        log_dir,
        &format!("{}.log", session_name.unwrap_or(&timestamp)),
    );

    // Create JSON file logging layer with all logs (DEBUG and above)
    let file_layer = fmt::layer()
        .with_target(true)
        .with_level(true)
        .with_writer(file_appender)
        .with_ansi(false)
        .with_file(true)
        .pretty();

    // Create console logging layer for development - INFO and above only
    let console_layer = fmt::layer()
        .with_target(true)
        .with_level(true)
        .with_ansi(true)
        .with_file(true)
        .with_line_number(true)
        .pretty();

    // Base filter
    let env_filter = EnvFilter::try_from_default_env().unwrap_or_else(|_| {
        // Set default levels for different modules
        EnvFilter::new("")
            // Set goose module to INFO only
            .add_directive("goose=debug".parse().unwrap())
            // Set goose-cli to INFO
            .add_directive("goose_cli=info".parse().unwrap())
            // Set everything else to WARN
            .add_directive(LevelFilter::WARN.into())
    });

    // Build the subscriber with required layers
    let subscriber = Registry::default()
        .with(file_layer.with_filter(env_filter)) // Gets all logs
        .with(console_layer.with_filter(LevelFilter::INFO)); // Controls log levels

    // Initialize with Langfuse if available
    if let Some(langfuse) = langfuse_layer::create_langfuse_observer() {
        subscriber
            .with(langfuse.with_filter(LevelFilter::DEBUG))
            .try_init()
            .context("Failed to set global subscriber")?;
    } else {
        subscriber
            .try_init()
            .context("Failed to set global subscriber")?;
    }

    Ok(())
}
