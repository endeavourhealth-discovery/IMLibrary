import { Models } from "../../models";
const { User, CustomAlert } = Models;

export default class AuthService {
  private auth: any;

  constructor(auth: any) {
    this.auth = auth;
  }

  public async register(userToRegister: Models.User): Promise<Models.CustomAlert> {
    try {
      await this.auth.signUp({
        username: userToRegister.username,
        password: userToRegister.password,
        attributes: {
          email: userToRegister.email,
          "custom:forename": userToRegister.firstName,
          "custom:surname": userToRegister.lastName,
          "custom:avatar": userToRegister.avatar
        }
      });
      return new CustomAlert(201, "User registered successfully");
    } catch (err: any) {
      if (err.code === "UsernameExistsException") {
        return new CustomAlert(409, "Username already exists", err);
      } else {
        return new CustomAlert(400, "User registration failed", err);
      }
    }
  }

  public async confirmRegister(username: string, code: string): Promise<Models.CustomAlert> {
    try {
      await this.auth.confirmSignUp(username, code);
      return new CustomAlert(200, "Register confirmation successful");
    } catch (err: any) {
      return new CustomAlert(403, "Failed register confirmation", err);
    }
  }

  public async signIn(username: string, password: string): Promise<Models.CustomAlert> {
    try {
      const user = await this.auth.signIn(username, password);
      const signedInUser = new User(
        user.username,
        user.attributes["custom:forename"],
        user.attributes["custom:surname"],
        user.attributes.email,
        "",
        user.attributes["custom:avatar"],
        user.signInUserSession?.accessToken?.payload["cognito:groups"] || []
      );
      signedInUser.setId(user.attributes.sub);
      return new CustomAlert(200, "Login successful", undefined, signedInUser);
    } catch (err: any) {
      if (err.code === "UserNotConfirmedException") {
        return new CustomAlert(401, err.message, err); //message: "User is not confirmed."
      }
      return new CustomAlert(403, "Login failed. Check username and password are correct", err);
    }
  }

  public async resendConfirmationCode(username: string): Promise<Models.CustomAlert> {
    try {
      await this.auth.resendSignUp(username);
      return new CustomAlert(200, "Code resent successfully");
    } catch (err: any) {
      return new CustomAlert(400, "Error resending code", err);
    }
  }

  public async signOut(): Promise<Models.CustomAlert> {
    try {
      await this.auth.signOut({ global: true });
      return new CustomAlert(200, "Logged out successfully");
    } catch (err: any) {
      return new CustomAlert(400, "Error logging out from auth server", err);
    }
  }

  public async updateUser(userToUpdate: Models.User): Promise<Models.CustomAlert> {
    try {
      const user = await this.auth.currentAuthenticatedUser();
      if (user.attributes.sub === userToUpdate.id) {
        const atts: {
          email: string;
          "custom:forename": string;
          "custom:surname": string;
          "custom:avatar": string;
        } = {
          email: userToUpdate.email,
          "custom:forename": userToUpdate.firstName,
          "custom:surname": userToUpdate.lastName,
          "custom:avatar": userToUpdate.avatar
        };
        await this.auth.updateUserAttributes(user, atts);
        const updateResults = await this.auth.currentAuthenticatedUser();
        const updatedUser = new User(
          updateResults.username,
          updateResults.attributes["custom:forename"],
          updateResults.attributes["custom:surname"],
          updateResults.attributes.email,
          "",
          updateResults.attributes["custom:avatar"],
          updateResults.signInUserSession?.accessToken?.payload["cognito:groups"] || []
        );
        updatedUser.setId(updateResults.attributes.sub);
        return new CustomAlert(200, "User updated successfully", undefined, updatedUser);
      } else {
        return new CustomAlert(403, "Authentication error with server");
      }
    } catch (err: any) {
      return new CustomAlert(500, "Error authenticating current user", err);
    }
  }

  public async verifyEmail(code: string) {
    try {
      const result = await this.auth.verifyCurrentUserAttributeSubmit("email", code);
      return new CustomAlert(200, "Email verified successfully", result);
    } catch (err: any) {
      return new CustomAlert(500, "Error verifying email", err);
    }
  }

  public async changePassword(oldPassword: string, newPassword: string): Promise<Models.CustomAlert> {
    try {
      const user = await this.auth.currentAuthenticatedUser();
      await this.auth.changePassword(user, oldPassword, newPassword);
      return new CustomAlert(200, "Password successfully changed");
    } catch (err: any) {
      return new CustomAlert(400, err.message, err);
    }
  }

  async forgotPassword(username: string): Promise<Models.CustomAlert> {
    try {
      await this.auth.forgotPassword(username);
      return new CustomAlert(200, "Password reset request sent to server");
    } catch (err: any) {
      return new CustomAlert(400, "Error resetting password from server", err);
    }
  }

  async forgotPasswordSubmit(username: string, code: string, newPassword: string): Promise<Models.CustomAlert> {
    try {
      await this.auth.forgotPasswordSubmit(username, code, newPassword);
      return new CustomAlert(200, "Password reset successfully");
    } catch (err: any) {
      if (err.code === "ExpiredCodeException") {
        return new CustomAlert(403, "Code has expired", err);
      }
      return new CustomAlert(400, "Error submitting password-reset credentials", err);
    }
  }

  async forgotUsername(email: string): Promise<Models.CustomAlert> {
    try {
      await this.auth.verifyCurrentUserAttribute(email);
      return new CustomAlert(200, "Account recovery code sent");
    } catch (err: any) {
      return new CustomAlert(400, "Error submitting email", err);
    }
  }

  async getCurrentAuthenticatedUser(): Promise<Models.CustomAlert> {
    try {
      const cognitoUser = await this.auth.currentAuthenticatedUser();

      const authenticatedUser = new User(
        cognitoUser.username,
        cognitoUser.attributes["custom:forename"],
        cognitoUser.attributes["custom:surname"],
        cognitoUser.attributes.email,
        "",
        cognitoUser.attributes["custom:avatar"],
        cognitoUser.signInUserSession?.accessToken?.payload["cognito:groups"] || []
      );
      authenticatedUser.setId(cognitoUser.attributes.sub);
      return new CustomAlert(200, "User authenticated successfully", undefined, authenticatedUser);
    } catch (err: any) {
      return new CustomAlert(403, "Error authenticating current user", err);
    }
  }

  // currently not a feature with AWS Auth
  // async forgotUsernameSubmit(email: string, code: string): Promise<CustomAlert> {
  //   try {
  //     await Auth.(email, code); // finish this if ever becomes a feature
  //     return new CustomAlert(200, "Account recovered successfully");
  //   } catch (err: any) {
  //     console.error(err);
  //     if (err.code === "ExpiredCodeException"){
  //       return new CustomAlert(403, "Code has expired", err);
  //     }
  //     return new CustomAlert(400, "Error submitting account recovery credentials", err);
  //   }
  // },
}
