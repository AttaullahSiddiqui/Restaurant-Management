import { BranchInfoModule } from './branch-info.module';

describe('BranchInfoModule', () => {
  let branchInfoModule: BranchInfoModule;

  beforeEach(() => {
    branchInfoModule = new BranchInfoModule();
  });

  it('should create an instance', () => {
    expect(branchInfoModule).toBeTruthy();
  });
});
