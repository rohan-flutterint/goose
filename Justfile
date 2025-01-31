# Justfile

# Default release command
release:
    @echo "Building release version..."
    cargo build --release
    @just copy-binary

# Build Windows executable
release-windows:
    #!/usr/bin/env sh
    if [ "$(uname)" = "Darwin" ] || [ "$(uname)" = "Linux" ]; then
        echo "Building Windows executable using Docker..."
        docker run --rm -v "$(pwd)":/usr/src/myapp -w /usr/src/myapp \
            rust:latest \
            sh -c "rustup target add x86_64-pc-windows-gnu && \
                apt-get update && \
                apt-get install -y mingw-w64 && \
                cargo build --release --target x86_64-pc-windows-gnu && \
                cp /usr/lib/gcc/x86_64-w64-mingw32/*/libstdc++-6.dll /usr/src/myapp/target/x86_64-pc-windows-gnu/release/ && \
                cp /usr/lib/gcc/x86_64-w64-mingw32/*/libgcc_s_seh-1.dll /usr/src/myapp/target/x86_64-pc-windows-gnu/release/ && \
                cp /usr/x86_64-w64-mingw32/lib/libwinpthread-1.dll /usr/src/myapp/target/x86_64-pc-windows-gnu/release/"
    else
        echo "Building Windows executable natively..."
        powershell.exe -Command "docker run --rm -v ${PWD}:/usr/src/myapp -w /usr/src/myapp rust:latest sh -c 'rustup target add x86_64-pc-windows-gnu && apt-get update && apt-get install -y mingw-w64 && cargo build --release --target x86_64-pc-windows-gnu && cp /usr/lib/gcc/x86_64-w64-mingw32/*/libstdc++-6.dll /usr/src/myapp/target/x86_64-pc-windows-gnu/release/ && cp /usr/lib/gcc/x86_64-w64-mingw32/*/libgcc_s_seh-1.dll /usr/src/myapp/target/x86_64-pc-windows-gnu/release/ && cp /usr/x86_64-w64-mingw32/lib/libwinpthread-1.dll /usr/src/myapp/target/x86_64-pc-windows-gnu/release/'"
    fi
    echo "Windows executable and required DLLs created at ./target/x86_64-pc-windows-gnu/release/"

# Copy binary command
copy-binary:
    @if [ -f ./target/release/goosed ]; then \
        echo "Copying goosed binary to ui/desktop/src/bin with permissions preserved..."; \
        cp -p ./target/release/goosed ./ui/desktop/src/bin/; \
    else \
        echo "Release binary not found."; \
        exit 1; \
    fi

# Copy Windows binary command
copy-binary-windows:
    @powershell.exe -Command "if (Test-Path ./target/x86_64-pc-windows-gnu/release/goosed.exe) { \
        Write-Host 'Copying Windows binary and DLLs to ui/desktop/src/bin...'; \
        Copy-Item -Path './target/x86_64-pc-windows-gnu/release/goosed.exe' -Destination './ui/desktop/src/bin/' -Force; \
        Copy-Item -Path './target/x86_64-pc-windows-gnu/release/*.dll' -Destination './ui/desktop/src/bin/' -Force; \
    } else { \
        Write-Host 'Windows binary not found.' -ForegroundColor Red; \
        exit 1; \
    }"

# Run UI with latest
run-ui:
    @just release
    @echo "Running UI..."
    cd ui/desktop && npm install && npm run start-gui

# Run UI with latest (Windows version)
run-ui-windows:
    @just release-windows
    @powershell.exe -Command "Write-Host 'Copying Windows binary...'"
    @just copy-binary-windows
    @powershell.exe -Command "Write-Host 'Running UI...'; Set-Location ui/desktop; npm install; npm run start-gui"

# Run Docusaurus server for documentation
run-docs:
    @echo "Running docs server..."
    cd documentation && yarn && yarn start

# Run server
run-server:
    @echo "Running server..."
    cargo run -p goose-server

# make GUI with latest binary
make-ui:
    @just release
    cd ui/desktop && npm run bundle:default

# make GUI with latest Windows binary
make-ui-windows:
    @just release-windows
    @powershell.exe -Command "if (Test-Path ./target/x86_64-pc-windows-gnu/release/goosed.exe) { \
        Write-Host 'Copying Windows binary and DLLs to ui/desktop/src/bin...'; \
        Copy-Item -Path './target/x86_64-pc-windows-gnu/release/goosed.exe' -Destination './ui/desktop/src/bin/' -Force; \
        Copy-Item -Path './target/x86_64-pc-windows-gnu/release/*.dll' -Destination './ui/desktop/src/bin/' -Force; \
    } else { \
        Write-Host 'Windows binary not found.' -ForegroundColor Red; \
        exit 1; \
    }"
    cd ui/desktop && npm run bundle:windows

# Setup langfuse server
langfuse-server:
    #!/usr/bin/env bash
    ./scripts/setup_langfuse.sh