import React, { useState, useEffect } from 'react';
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import Select from 'react-select';
import { Plus } from 'lucide-react';
import { useHandleModelSelection } from "./utils";
import { useActiveKeys } from "../api_keys/ActiveKeysContext";
import { goose_models } from "./hardcoded_stuff";

export function AddModelInline() {
    const { activeKeys } = useActiveKeys(); // Access active keys from context

    // Convert active keys to dropdown options
    const providerOptions = activeKeys.map((key) => ({
        value: key.toLowerCase(),
        label: key,
    }));

    const [selectedProvider, setSelectedProvider] = useState<string | null>(null);
    const [modelName, setModelName] = useState<string>("");
    const [filteredModels, setFilteredModels] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const handleModelSelection = useHandleModelSelection();

    // Filter models by selected provider and input text
    useEffect(() => {
        if (!selectedProvider || !modelName) {
            setFilteredModels([]);
            setShowSuggestions(false);
            return;
        }

        const filtered = goose_models
            .filter(
                (model) =>
                    model.provider.toLowerCase() === selectedProvider &&
                    model.name.toLowerCase().includes(modelName.toLowerCase())
            )
            .slice(0, 5); // Limit suggestions to top 5
        setFilteredModels(filtered);
        setShowSuggestions(filtered.length > 0);
    }, [modelName, selectedProvider]);

    const handleSubmit = () => {
        if (!selectedProvider || !modelName) {
            console.error("Both provider and model name are required.");
            return;
        }

        // Find the selected model from the filtered models
        let selectedModel = goose_models.find(
            (model) =>
                model.provider.toLowerCase() === selectedProvider &&
                model.name.toLowerCase() === modelName.toLowerCase()
        );

        if (!selectedModel) {
            // Normalize the casing for the provider using the first matching model
            const normalizedProvider = goose_models.find(
                (model) => model.provider.toLowerCase() === selectedProvider
            )?.provider || selectedProvider;

            // Construct a model object
            selectedModel = {
                name: modelName,
                provider: normalizedProvider, // Use normalized provider
            };
            console.log("made up selectedmodel", modelName, normalizedProvider);
        }
        // Trigger the model selection logic
        handleModelSelection(selectedModel, "AddModelInline");

        // Reset form state
        setSelectedProvider(null); // Clear the provider selection
        setModelName(""); // Clear the model name
        setFilteredModels([]);
        setShowSuggestions(false);
    };

    const handleSelectSuggestion = (suggestion) => {
        setModelName(suggestion.name);
        setShowSuggestions(false); // Hide suggestions after selection
    };

    const handleBlur = () => {
        setTimeout(() => setShowSuggestions(false), 150); // Delay to allow click to register
    };

    return (
        <div className="p-6 border border-gray-200 rounded-lg shadow mb-6">
            <h2 className="text-lg font-semibold mb-4">Add New Model</h2>
            <form className="grid grid-cols-[1.5fr_2fr_auto] gap-4 items-center">
                <Select
                    options={providerOptions}
                    value={providerOptions.find((option) => option.value === selectedProvider) || null}
                    onChange={(option) => {
                        setSelectedProvider(option?.value || null);
                        setModelName(""); // Clear model name when provider changes
                        setFilteredModels([]);
                    }}
                    placeholder="Select provider"
                    isClearable
                    styles={{
                        control: (base) => ({
                            ...base,
                            minWidth: "200px", // Set minimum width for provider dropdown
                        }),
                    }}
                />
                <div className="relative" style={{ minWidth: "150px", maxWidth: "250px" }}>
                    <Input
                        type="text"
                        placeholder="Model name"
                        value={modelName}
                        onChange={(e) => setModelName(e.target.value)}
                        onBlur={handleBlur}
                    />
                    {showSuggestions && (
                        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg">
                            {filteredModels.map((model) => (
                                <div
                                    key={model.id}
                                    className="p-2 cursor-pointer hover:bg-gray-100"
                                    onClick={() => handleSelectSuggestion(model)}
                                >
                                    {model.name}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <Button type="button" className="bg-black text-white hover:bg-black/90" onClick={handleSubmit}>
                    <Plus className="mr-2 h-4 w-4" /> Add Model
                </Button>
            </form>
        </div>
    );
}
