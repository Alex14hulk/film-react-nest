import { TskvLogger } from './tskv_logger';

describe('TskvLogger', () => {
  it('logger.log() should print correct tskv', () => {
    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    const logger = new TskvLogger();
    const logText = 'Any logging text';
    logger.log(logText);
    expect(logSpy).toHaveBeenCalledWith(
      `level=log\tmessage=${logText}\toptionalParams=\n`,
    );
  });

  it('logger.warn() should print correct tskv', () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    const logger = new TskvLogger();
    const warnText = 'Any warning text';
    logger.warn(warnText);
    expect(warnSpy).toHaveBeenCalledWith(
      `level=warn\tmessage=${warnText}\toptionalParams=\n`,
    );
  });

  it('logger.error() should print correct tskv', () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const logger = new TskvLogger();
    const errorText = 'Any error text';
    logger.error(errorText);
    expect(errorSpy).toHaveBeenCalledWith(
      `level=error\tmessage=${errorText}\toptionalParams=\n`,
    );
  });
});