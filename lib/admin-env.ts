/** Admin login — use PORTFOLIO_ADMIN_EMAIL / PORTFOLIO_ADMIN_PASSWORD in production (.env.local). */
export function getExpectedAdminEmail(): string {
  return (
    process.env.PORTFOLIO_ADMIN_EMAIL ??
    (process.env.NODE_ENV !== "production" ? "vasanthavanan12@gmail.com" : "")
  );
}

export function getExpectedAdminPassword(): string {
  return (
    process.env.PORTFOLIO_ADMIN_PASSWORD ?? (process.env.NODE_ENV !== "production" ? "vasan123" : "")
  );
}
