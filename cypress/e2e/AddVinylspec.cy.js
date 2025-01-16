describe("AddVinylSpec", () => {
  const baseUrl = "http://localhost:3000";

  before(() => {
    cy.visit(`${baseUrl}/Login`);
    cy.get('[data-cy="input-username"]').type("Admin");
    cy.get('[data-cy="input-password"]').type("Admin");
    cy.get('[data-cy="login-button"]').click();

    cy.url().should("include", "/listings");
  });


})