import { TestScheduler } from 'rxjs/testing'
import { expect } from 'chai'

import { pingEpic } from './ping'

describe('Epic ping', () => {
  const testScheduler = new TestScheduler((actual, expected) => {
    // somehow assert the two objects are equal
    // e.g. with chai `expect(actual).deep.equal(expected)`
    console.log('actual', actual)
    console.log('expected', expected)
    expect(actual).deep.equal(expected)
  })
  it('should trigger PONG after 1s', () => {
    testScheduler.run(({ hot, cold, expectObservable }) => {
      const action$ = hot('-a', {
        a: { type: 'PING' }
      })

      const output$ = pingEpic(action$)

      expectObservable(output$).toBe('- 1s a', {
        a: {
          type: 'PONG'
        }
      })
    })
  })
})
