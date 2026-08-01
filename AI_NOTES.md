# AI Usage Notes

## AI Tool Used
ChatGPT 

---

## 1. Which parts were AI-assisted vs. written by me

**Used AI for:**
- Understanding the exact requirements of the project - what input/output each API needed, so I was clear on the spec before writing code.
- Deciding which project structure to use for better code reusability and clean architecture - discussed a layered structure (Routes → Controllers → Services → Utils → JSON storage) instead of dumping logic into controllers.
- Generated an initial implementation for `file.utils.js`, which I later modified and integrated with the rest of the project.
- Suggested `express-validator` rules for date format and preventing amount ≤ 0.
- Suggested the structure for `errorHandler.middleware.js` - used this to make sure errors returned clean JSON instead of messy/HTML output.
- Brainstormed multiple ways to represent API output at an "industry" level (see point 2 for the concrete example).

**Implemented and integrated by me:**
- Wrote the routes first as a high-level skeleton, then the controller and service logic for every endpoint (add, view, filter, total, category-total, delete, monthly summary) - after discussing the approach with AI, I did the actual implementation and wiring myself.
- All routes and wiring between routes → controllers → services.
- All Jest/Supertest test cases.
- Manual testing of every endpoint in Postman before and after each change.

---

## 2. What I validated, tested, or changed in AI's output

- **Async fix:** AI's version of `file.utils.js` had a function that wasn't async. I changed it to use `async/await` consistently, since the rest of the project relies on that pattern.
- **Response format:** AI's first suggestion for totals was just `{ "total": 600 }`. I pushed for more - changed it to also return a count: `{ "totalExpense": 600, "expenseCount": 2 }`, applied to category-wise totals too. This was one of the areas where I intentionally compared a few alternatives before settling on the final response shape.
- Took AI's service-layer suggestions and refined `expense.services.js` further - specifically, response consistency across endpoints, `createdAt` field, `expenseCount`, and case-insensitive category filtering were all things I added/adjusted after the initial suggestion.
- Reviewed the error-handling middleware AI suggested - made sure it always returns proper JSON and never leaks raw error/HTML output.
- Debugged runtime issues during development - when the server crashed or gave unexpected output, AI helped me narrow down likely causes, but I traced the actual bug, implemented the fix, and verified it myself every time.
- Verified every AI-influenced piece of code manually in Postman before trusting it - didn't copy-paste anything without running it first.

---

## 3. AI suggestions I decided not to use

- AI suggested several extra validation rules and additional responsibilities beyond what the assignment needed - I picked only what was required to keep the project clean and focused on the core assignment, instead of over-engineering it.
- AI suggested returning more metadata in several API responses - I kept only what actually improved usability (expenseCount, createdAt), to avoid unnecessarily verbose responses.
- AI suggested some additional README sections to make it look more "professional" - I kept only what was actually relevant to running and understanding this specific project.
- Database integration (MongoDB) - not used, since the assignment explicitly required local JSON storage.
- Authentication - out of scope for this assignment, skipped.
- Docker and Swagger/OpenAPI - both were optional bonus choices; I picked only the Monthly Summary endpoint as my one bonus feature.

---

## Development Order

1. Understand requirements and API input/output expectations
2. Decide project structure
3. Project/Express setup
4. Routes (initial high-level skeleton)
5. Controllers (planned, implemented later)
6. Services (planned, implemented later)
7. Utility layer - JSON read/write logic
8. Back to services - integrated utility functions
9. Fully implemented controllers and routes, tested with Postman
10. Error handling and middleware improvements
11. Automated tests (Jest/Supertest)
12. Documentation

AI was used for discussion, initial approach suggestions, and review at each stage. Core business logic, debugging fixes, and all testing were done and verified by me before anything became part of the final project.