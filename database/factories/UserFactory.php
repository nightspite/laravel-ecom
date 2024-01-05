<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'email' => fake()->unique()->safeEmail(),
            'email_verified_at' => now(),
            'password' => static::$password ??= Hash::make('password'),
            'remember_token' => Str::random(10),
            'first_name' => fake()->firstName(),
            'last_name' => fake()->lastName(),
            'address' => fake()->streetAddress(),
            'city' => fake()->city(),
            'state' => fake()->stateAbbr(),
            'zip' => fake()->postcode(),
            'country' => fake()->country(),
            'education' => fake()->randomElement(['Basic', 'Secondary', 'Higher']),
            'hobbies' => fake()->randomElement(['Reading', 'Writing', 'Coding', 'Gaming', 'Sports', 'Music', 'Movies', 'Cooking', 'Dancing', 'Singing', 'Traveling', 'Photography', 'Painting', 'Gardening', 'Fishing', 'Hiking', 'Camping', 'Shopping', 'Sightseeing', 'Swimming', 'Running', 'Cycling', 'Yoga', 'Meditation', 'Volunteering', 'Socializing', 'Other'])
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}
