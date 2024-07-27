import { expect, test } from "./pages";

test.describe("Login Page", () => {
  test("User is able to login and log out", async ({ loginPage, mainPage }) => {
    await loginPage.navigate();
    await loginPage.login("test@hackaton.com", "test123!");
    await expect(mainPage.header).toBeVisible();
    await mainPage.signOut();
    await expect(loginPage.header).toBeVisible();
  });
});
