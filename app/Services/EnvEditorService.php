<?php

namespace App\Services;

class EnvEditorService
{
    /**
     * Update or append multiple key-value pairs in the .env file.
     *
     * @param array<string, string|null> $data
     * @return bool
     */
    public static function update(array $data): bool
    {
        $envPath = base_path('.env');

        if (!file_exists($envPath)) {
            return false;
        }

        $envContent = file_get_contents($envPath);

        foreach ($data as $key => $value) {
            $key = strtoupper(trim($key));
            
            // Format value: if value is null, use empty string; if contains spaces, wrap in double quotes
            if (is_null($value)) {
                $formattedValue = 'null';
            } elseif ($value === '') {
                $formattedValue = '""';
            } elseif (preg_match('/\s/', $value) || str_contains($value, '#') || str_contains($value, '$')) {
                $escaped = str_replace('"', '\"', $value);
                $formattedValue = "\"{$escaped}\"";
            } else {
                $formattedValue = $value;
            }

            $pattern = "/^{$key}=.*/m";

            if (preg_match($pattern, $envContent)) {
                $envContent = preg_replace($pattern, "{$key}={$formattedValue}", $envContent);
            } else {
                $envContent .= "\n{$key}={$formattedValue}";
            }
        }

        file_put_contents($envPath, $envContent);

        return true;
    }

    /**
     * Get the current value of a key from .env file directly (not cached config).
     */
    public static function get(string $key, ?string $default = null): ?string
    {
        $envPath = base_path('.env');
        if (!file_exists($envPath)) {
            return $default;
        }

        $envContent = file_get_contents($envPath);
        if (preg_match("/^{$key}=(.*)$/m", $envContent, $matches)) {
            $value = trim($matches[1]);
            // Strip wrapping quotes if any
            if ((str_starts_with($value, '"') && str_ends_with($value, '"')) ||
                (str_starts_with($value, "'") && str_ends_with($value, "'"))) {
                return substr($value, 1, -1);
            }
            return $value === 'null' ? null : $value;
        }

        return $default;
    }
}
