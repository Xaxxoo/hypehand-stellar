import { Injectable } from '@nestjs/common';
import keyring from 'keyring';

/**
 * AppService
 *
 * This service demonstrates secure handling of Stellar secret keys.
 * The secret key is loaded from the environment variable `STELLAR_SECRET_KEY`
 * or from the system keyring (via the `keyring` npm package).
 *
 * IMPORTANT: Never commit your secret keys to source control.
 * Use environment variables or a secure keyring instead.
 */
@Injectable()
export class AppService {
  /**
   * Returns a greeting message.
   */
  getHello(): string {
    return 'Hello World!';
  }

  /**
   * Loads the Stellar secret key securely.
   *
   * The key is first attempted to be read from the environment variable
   * `STELLAR_SECRET_KEY`. If not present, it falls back to the system keyring.
   *
   * The local reference to the key is wiped (set to `undefined`) immediately
   * after being copied to the return value to reduce the risk of memory leaks.
   *
   * @returns {Promise<string>} The Stellar secret key.
   * @throws {Error} If the key cannot be found.
   */
  async loadSecretKey(): Promise<string> {
    let secretKey: string | undefined;

    // 1. Try environment variable
    if (process.env.STELLAR_SECRET_KEY) {
      secretKey = process.env.STELLAR_SECRET_KEY;
    } else {
      // 2. Fallback to system keyring
      try {
        // The keyring service name is 'stellar' and the account name is 'secret-key'
        secretKey = await keyring.getPassword('stellar', 'secret-key');
      } catch (e) {
        // If keyring lookup fails, throw a clear error
        throw new Error(
          'Stellar secret key not found in environment or system keyring',
        );
      }
    }

    if (!secretKey) {
      throw new Error('Stellar secret key is undefined');
    }

    // Return a copy of the key and wipe the local reference
    const keyCopy = secretKey;
    // Overwrite the local variable to reduce the chance of accidental leaks
    secretKey = undefined as any;
    return keyCopy;
  }
}