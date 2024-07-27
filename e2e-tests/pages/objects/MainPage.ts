import { Locator, Page } from "@playwright/test";

export class MainPage {
  readonly page: Page;
  readonly header: Locator;
  readonly addNewTodoButton: Locator;
  readonly todoDialog: Locator;
  readonly todoDialogTitleField: Locator;
  readonly todoDialogDescriptionField: Locator;
  readonly todoDialogDueDateField: Locator;
  readonly todoDialogCreateButton: Locator;
  readonly todoDialogCloseButton: Locator;
  readonly menuItem: Locator;
  readonly signUserOut: Locator;
  readonly searchField: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = page.getByRole("heading", { name: "To-Do" });
    this.addNewTodoButton = page.getByRole("button", { name: "Add New" });
    this.todoDialog = page.getByRole("dialog", { name: "Create Todo" });
    this.todoDialogTitleField = page.getByRole("textbox", { name: "Title" });
    this.todoDialogDescriptionField = page.getByRole("textbox", {
      name: "Description",
    });
    this.todoDialogDueDateField = page.getByRole("button", {
      name: "Pick a date",
    });
    this.todoDialogCreateButton = page.getByRole("button", { name: "Create" });
    this.todoDialogCloseButton = page.getByLabel("Close");
    this.searchField = page.getByPlaceholder("Search by title...");
    this.menuItem = page.getByRole("menuitem", { name: "Todos" });
    this.signUserOut = page.getByRole("menuitem", { name: "Signout ⌘Q" });
  }

  get url() {
    return "/todo";
  }

  async navigate() {
    await this.page.goto(this.url);
  }

  async openNewTodoDialog() {
    await this.addNewTodoButton.click();
  }

  async closeTodoDialog() {
    await this.todoDialogCloseButton.click();
  }

  async searchForTodoByTitle(title: string) {
    await this.searchField.fill(title);
  }

  async createNewTodo(title: string, description: string) {
    await this.todoDialogTitleField.fill(title);
    await this.todoDialogDescriptionField.fill(description);
    await this.todoDialogCreateButton.click();
  }

  async signOut() {
    await this.menuItem.click();
    await this.signUserOut.click();
  }
}
