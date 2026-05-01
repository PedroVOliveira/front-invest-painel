export interface User {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

export const userFactory = {
  createUser: (overrides: Partial<User> = {}): User => ({
    id: "user-1",
    name: "John Doe",
    email: "john@example.com",
    image: "https://example.com/avatar.jpg",
    ...overrides,
  }),

  createSession: (overrides: Partial<{ user: User }> = {}) => ({
    user: userFactory.createUser(overrides.user),
    expires: new Date(Date.now() + 86400000).toISOString(),
    ...overrides,
  }),
};
