declare module 'allure-commandline' {
  import { ChildProcess } from 'node:child_process'

  /**
   * Runs the Allure CLI with the given arguments.
   *
   * @param args - CLI arguments, e.g. `['generate', 'allure-results', '--clean']`
   * @returns The spawned child process
   */
  function allure(args: string[]): ChildProcess

  export default allure
}
