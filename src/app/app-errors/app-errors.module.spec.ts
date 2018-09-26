import { AppErrorsModule } from './app-errors.module';

describe('AppErrorsModule', () => {
  let appErrorsModule: AppErrorsModule;

  beforeEach(() => {
    appErrorsModule = new AppErrorsModule();
  });

  it('should create an instance', () => {
    expect(appErrorsModule).toBeTruthy();
  });
});
