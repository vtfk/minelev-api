describe('jest test', () => {
  it('true is true', () => {
    expect(true).toBe(true)
  })

  it('true is not false', () => {
    expect(true).not.toBe(false)
  })
})
