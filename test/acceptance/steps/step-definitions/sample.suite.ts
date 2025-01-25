import { Given, Suite, Then, When } from '@fiap-x/acceptance-factory';
import { strict as assert } from 'assert';

@Suite()
export class VideoSuite {
  @Given('a specific scenario')
  async setTheScene() {
    // noop: just example
  }

  @When('some condition happens')
  async executeConditions() {
    // noop: just example
  }

  @Then('the scenario is verified')
  async verifyIdExists() {
    assert.ok('all good');
  }
}
