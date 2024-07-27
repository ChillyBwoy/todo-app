import { expect, test } from "./pages";

test.describe("Main Page", () => {
  test("4. As a user, I want to create a new to-do item so that I can keep track of my tasks.", async ({
    loginPage,
    mainPage,
    page,
  }) => {
    await loginPage.navigate();
    await loginPage.login("test@hackaton.com", "test123!");
    await expect(mainPage.header).toBeVisible();

    // 4.1 click button "Add New" modal Create Todo open
    await mainPage.openNewTodoDialog();
    await expect(mainPage.todoDialog).toBeVisible();

    // 4.2 a new to-do item can't be saved without Title
    await mainPage.createNewTodo("", "");
    await expect(mainPage.todoDialog).toBeVisible();
    await mainPage.closeTodoDialog();

    const title = `test ${new Date().getTime()}`;

    // 4.3 the typed name is saved, it show in the list.
    await mainPage.openNewTodoDialog();
    await mainPage.createNewTodo(title, "");
    await expect(mainPage.todoDialog).not.toBeVisible();

    await mainPage.searchForTodoByTitle(title);
    await expect(
      page.getByRole("rowheader", { name: new RegExp(title) })
    ).toBeVisible();
    // 4.4 a new to-do item can be saved without Description
    await expect(page.locator("td:nth-child(3)")).toBeEmpty();
    // 4.5 a new to-do item can be saved without Due Date
    await expect(page.locator("td:nth-child(4)")).toBeEmpty();
  });
});
