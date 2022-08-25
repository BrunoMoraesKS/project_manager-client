describe('Testing task CRUD', () => {
  it('can create a task', () => {
    cy.visit('http://localhost:3000/');

    cy.get('[data-cy=new-project-button]').click();
    cy.get('input').type('Project1727test{enter}');

    cy.wait(500);

    cy.get('div').contains('Project1727test').click();

    cy.get('[data-cy=new-task-button]').click();

    cy.get('label').contains('Tarefa').next().type('Tarefa teste');
    cy.get('label').contains('Usuário').next().type('Usuario Teste');
    cy.get('label').contains('Deve ser feito até').next().type('2021-01-01');

    cy.get('button').contains('CRIAR').click();
  });

  it('can update a task', () => {
    cy.wait(500);

    cy.get('[data-cy=update-task-button]').click();

    cy.get('label').contains('Tarefa').next().clear().type('Tarefa Editada');

    cy.get('button').contains('EDITAR').click();
  });

  it('can delete a task', () => {
    cy.wait(500);

    cy.get('[data-cy=delete-task-button]').click();

    cy.get('button').contains('DELETAR').click();

    cy.get('[data-cy=softdelete-project-button]').click();

    cy.get('button').contains('MOVER').click();

    cy.wait(500);

    cy.visit('http://localhost:3000/trashCan');

    cy.get('[data-cy=delete-project-button-Project1727test]').click();

    cy.get('button').contains('DELETAR').click();
  });
});
