# Security Specification — Splash Zoo

## 1. Data Invariants
1. Default-deny catch-all blocks all reads and writes to any unmapped path (including `test/connection`).
2. `/users/{userId}` can only be read (`get`), created, updated, or deleted by the verified authenticated owner whose `request.auth.uid == userId` and `request.auth.token.email_verified == true`.
3. Collection listing (`list`) on `/users` is strictly forbidden (`allow list: if false`) to prevent user enumeration.
4. No PII (`email`, `phone`, `address`) is stored in Firestore documents; authentication details stay inside Firebase Authentication.
5. Document IDs `{userId}` must match `^[a-zA-Z0-9_\-]+$` and be at most 128 characters.
6. `uid` and `createdAt` are immutable after creation; `createdAt` and `updatedAt` must equal `request.time`.

## 2. Adversarial "Dirty Dozen" Payloads (All Must Fail with PERMISSION_DENIED)
1. Unauthenticated `get` on `/users/user_123`.
2. Unauthenticated `create` on `/users/user_123`.
3. Cross-user `get` on `/users/other_uid` while signed in as `user_123`.
4. Collection `list` query on `/users`.
5. Identity spoofing `create` on `/users/user_123` with payload `uid: "other_uid"`.
6. Unverified email `create` on `/users/user_123` (`email_verified: false`).
7. Shadow field injection `create` on `/users/user_123` with extra field `isAdmin: true`.
8. Missing required field `create` on `/users/user_123` omitting `displayName`.
9. Oversized string DoS `create`/`update` with `displayName` > 100 chars.
10. Client-forged timestamp `create`/`update` with `createdAt` or `updatedAt != request.time`.
11. Immortal field tampering `update` on `/users/user_123` attempting to mutate `createdAt` or `uid`.
12. Poisoned path ID `create` at `/users/invalid$id!with*spaces` or > 128 chars.
