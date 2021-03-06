describe('퀴즈 필수 구현 테스트', () => {
  beforeEach(() => {
    cy.visit('localhost:3000/')
  })
  it('사용자는 퀴즈 풀기 버튼을 클릭하여 퀴즈 풀기를 시작할 수 있다.', () => {
    cy.get('[data-cy=start-quiz-btn]').should('have.text', '퀴즈 풀기').click()
    cy.get('[data-cy=quiz-card]').should('exist')
  })
  it('사용자는 문항에 대한 답안을 4개 보기 중에 선택할 수 있다.', () => {
    cy.get('[data-cy=start-quiz-btn]').should('be.visible').click()
    cy.get('[data-cy=quiz-choice]').should('have.length', 4)
  })
  it('답안 선택 후 다음 문항 버튼을 볼 수 있다.', () => {
    cy.get('[data-cy=start-quiz-btn]').should('be.visible').click()
    cy.get('[data-cy=quiz-choice]').first().click()
    cy.get('[data-cy=next-button]').should('have.text', '다음 문항')
  })
  it('답안이 맞았는지 틀렸는지 바로 알 수 있다.', () => {
    cy.get('[data-cy=start-quiz-btn]').should('be.visible').click()
    cy.get('[data-cy=quiz-choice]').first().click().should('satisfy', ($el) => {
      const classList = Array.from($el[0].classList);
      return classList.includes('styles_choice__9TDc_') || classList.includes('styles_incorrect__X9M0_')
    })
  })
  it('다음 문항 버튼을 클릭하여 다음 문항으로 이동할 수 있다.', () => {
    cy.get('[data-cy=start-quiz-btn]').should('be.visible').click()
    cy.get('[data-cy=quiz-choice]').first().click()
    cy.get('[data-cy=next-button]').should('be.visible').click()
    cy.get('[data-cy=quiz-card]').should('exist')
  })
  it('모든 문항을 다 풀면 퀴즈를 마칠 때까지 소요된 시간, 정답 개수, 오답 수 결과 정보를 볼 수 있다.', () => {
    cy.get('[data-cy=start-quiz-btn]').should('be.visible').click()
    for (let i = 0; i < 10; i++) {
      cy.get('[data-cy=quiz-choice]').first().click()
      cy.get('[data-cy=next-button]').should('be.visible').click()
    }
    cy.get('[data-cy=quiz-card]').contains('소요된 시간')
    cy.get('[data-cy=quiz-card]').contains('정답 수')
    cy.get('[data-cy=quiz-card]').contains('오답 수')
  })
})