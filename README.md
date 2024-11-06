# Anon-Petition

Anon-Petition is a decentralized platform that enables citizens to create and support petitions anonymously using Anon Aadhaar for verification. The platform ensures privacy while maintaining accountability through pincode-based verification.

## About Anon Aadhaar

Anon Aadhaar is a zero-knowledge proof protocol that allows users to prove they own an Aadhaar card without revealing their identity. In Anon-Petition:

- Users verify their identity using their Aadhaar card's QR code
- The proof contains the user's pincode but keeps other details private
- A unique nullifier ensures each user can only upvote once
- No personal information is stored or shared

Learn more about [Anon Aadhaar](https://github.com/privacy-scaling-explorations/anon-aadhaar)

## Features

- **Anonymous Authentication**: Uses Anon Aadhaar for secure, privacy-preserving verification
- **Pincode-Based Petitions**: Users can only upvote petitions from their own pincode area
- **One-Time Upvoting**: Each verified user can upvote a petition only once
- **Location Filtering**: Filter petitions by state and pincode
- **Real-time Updates**: Instant feedback on petition submissions and upvotes

## Environment Setup

1. Create a Supabase project at [supabase.com](https://supabase.com)

2. Get your Supabase credentials:

   - Go to Project Settings
   - Find API Settings
   - Copy the `Project URL` and `anon` public API key

3. Create a `.env.local` file in the project root with the following content:

   ```
   REACT_APP_SUPABASE_URL=your_project_url
   REACT_APP_SUPABASE_ANON_KEY=your_anon_key
   ```

If you encounter any issues, please open an issue on our GitHub repository.
