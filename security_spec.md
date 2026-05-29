# Security Specification for NexusUtils

## 1. Data Invariants
- **User profiles (`users/{userId}`)**: 
  - A user can only read, create, or update their own profile document, where the document ID matches their authenticated Firebase UID (`request.auth.uid`).
  - Creation requires fields `uid`, `email`, and `createdAt` to pass structural bounds. `createdAt` must be set to `request.time`.
  - Profile updates are locked downstream so that `uid`, `email` and static identifiers are completely immutable after creation.
- **Feedback submissions (`feedback/{feedbackId}`)**:
  - Anyone can submit feedback (unauthenticated and authenticated users are supported to let anonymous users report issues).
  - Subject and message sizes are strictly limited (e.g., subject <= 200 chars, message <= 10,000 chars) to prevent resource stuffing and database space pollution.
  - Submissions are write-only. Reading/listing is restricted purely to system administrators.

---

## 2. The "Dirty Dozen" Malicious Payloads

The following payloads represent bypass attempts designed to break Identity, Integrity, administrative authority, or state flow. All of them must return `PERMISSION_DENIED`:

1. **Identity Spoofing - User Profile Creation**: Creating a user profile document with IDs mismatching the auth context (`/users/attacker_uid` with `request.auth.uid = victim_uid`).
2. **Identity Spoofing - User Creation with arbitrary fields**: Submitting user profile creations with extra unauthorized parameters like `isSystemRoot: true` (Malicious custom attributes).
3. **Immortality Modification**: Attempting an update that alters the `createdAt` or `email` field on a user document.
4. **Credential Manipulation**: Attempting to alter a user's authenticated email during profile update.
5. **PII Blanket Scrape**: Authenticated user trying to scrape other users' info with a blanket collection read query.
6. **Large Document Stuffing (Denial of Wallet)**: Submitting feedback document with a 5MB payload or arbitrary sizes.
7. **Invalid Feedback Type**: Enforcing incorrect category type on feedback (e.g., `type: "shady-backdoors"`).
8. **Feedback Injection - Spying**: Creating feedback but setting reading permissions so the creator tries to watch comments.
9. **Feedback Orphan Creation**: Submitting feedback specifying a victim's `userId` when not logged in as that user.
10. **Admin Escalation**: Try to create an admin entry inside the `/admins/` path.
11. **ID Poisoning Attack**: Trying to write a user file using an exceptionally large random string as a ID to leak memory or break key indexing.
12. **Future Timestamp Spoofing**: Trying to set `createdAt` in feedback/user record to a future date instead of `request.time`.

---

## 3. Security Tests Description
All the dirty dozen attempts will fail validation gates since they either lack matching UID boundaries, write to protected paths, violate size limitations, bypass system timestamp checks, or write outside allowed fields.
