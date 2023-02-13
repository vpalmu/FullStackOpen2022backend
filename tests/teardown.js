//  ref: https://mongoosejs.com/docs/jest.html
//
// added this function to be used in globalTeardown, otherwise below error will appear when tests are ran.
//
// 'Jest did not exit one second after the test run has completed.
// This usually means that there are asynchronous operations that weren't stopped in your tests. Consider running Jest with `--detectOpenHandles` to troubleshoot this issue.'

module.exports = () => {
    process.exit(0)
}