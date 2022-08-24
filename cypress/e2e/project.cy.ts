describe('Testing project CRUD', () => {
  it('can create a project', () => {
    cy.visit('http://localhost:3000/');

    cy.get('[data-cy=new-project-button]').click();

    cy.get('input').type('Projeto Teste{enter}');
  });

  it('can update a project', () => {
    cy.get('div').contains('Projeto Teste').click();

    cy.get('[data-cy=update-project-button]').click();

    cy.get('label').contains('Nome').next().clear().type('Projeto Editado');

    cy.get('button').contains('EDITAR').click();
  });

  it('can move a project to the trash', () => {
    cy.get('[data-cy=softdelete-project-button]').click();

    cy.get('button').contains('MOVER').click();
  });

  it('can restore and delete a project', () => {
    cy.wait(1000);

    cy.visit('http://localhost:3000/trashCan');

    cy.get('[data-cy=restore-project-button]').click();

    cy.wait(1000);

    cy.get('div').contains('Projeto Editado').click();

    cy.get('[data-cy=softdelete-project-button]').click();

    cy.get('button').contains('MOVER').click();

    cy.visit('http://localhost:3000/trashCan');

    cy.wait(1000);

    cy.get('[data-cy=delete-project-button]').click();

    cy.get('button').contains('DELETAR').click();
  });
});
