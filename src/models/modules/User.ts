export class User {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  avatar: string;
  id: string;

  constructor(
    username: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    avatar: string
  ) {
    this.username = username;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.avatar = avatar;
    this.id = "";
  }

  setId(id: string): void {
    this.id = id;
  }
}

export class CustomAlert {
  status: number;
  message: string;
  error?: Error | string;
  user?: User;

  constructor(
    status: number,
    message: string,
    error?: Error | string,
    user?: User
  ) {
    this.status = status;
    this.message = message;
    this.error = error;
    this.user = user;
  }
}

export enum PasswordStrength {
  weak = "weak",
  medium = "medium",
  strong = "strong",
  fail = "fail",
}

export const avatars = [
  "colour/001-man.png",
  "colour/002-man.png",
  "colour/003-man.png",
  "colour/004-man.png",
  "colour/005-man.png",
  "colour/006-man.png",
  "colour/007-man.png",
  "colour/008-man.png",
  "colour/009-man.png",
  "colour/010-woman.png",
  "colour/011-woman.png",
  "colour/012-woman.png",
  "colour/013-woman.png",
  "colour/014-woman.png",
  "colour/015-woman.png",
  "colour/016-woman.png",
  "colour/017-woman.png",
  "colour/018-man.png",
  "colour/019-man.png",
  "colour/020-man.png",
  "colour/021-man.png",
  "colour/022-man.png",
  "colour/023-man.png",
  "colour/024-man.png",
  "colour/025-man.png",
  "colour/026-man.png",
  "colour/027-woman.png",
  "colour/028-woman.png",
  "colour/029-woman.png",
  "colour/030-woman.png",
  "colour/031-woman.png",
  "colour/032-woman.png",
  "colour/033-woman.png",
  "colour/034-woman.png",
  "colour/035-man.png",
  "colour/036-man.png",
  "colour/037-man.png",
  "colour/038-man.png",
  "colour/039-man.png",
  "colour/040-man.png",
  "colour/041-man.png",
  "colour/042-man.png",
  "colour/043-woman.png",
  "colour/044-woman.png",
  "colour/045-woman.png",
  "colour/046-woman.png",
  "colour/047-woman.png",
  "colour/048-woman.png",
  "colour/049-woman.png",
  "colour/050-woman.png",
  "lineal/001-man.png",
  "lineal/002-man.png",
  "lineal/003-man.png",
  "lineal/004-man.png",
  "lineal/005-man.png",
  "lineal/006-man.png",
  "lineal/007-man.png",
  "lineal/008-man.png",
  "lineal/009-man.png",
  "lineal/010-woman.png",
  "lineal/011-woman.png",
  "lineal/012-woman.png",
  "lineal/013-woman.png",
  "lineal/014-woman.png",
  "lineal/015-woman.png",
  "lineal/016-woman.png",
  "lineal/017-woman.png",
  "lineal/018-man.png",
  "lineal/019-man.png",
  "lineal/020-man.png",
  "lineal/021-man.png",
  "lineal/022-man.png",
  "lineal/023-man.png",
  "lineal/024-man.png",
  "lineal/025-man.png",
  "lineal/026-man.png",
  "lineal/027-woman.png",
  "lineal/028-woman.png",
  "lineal/029-woman.png",
  "lineal/030-woman.png",
  "lineal/031-woman.png",
  "lineal/032-woman.png",
  "lineal/033-woman.png",
  "lineal/034-woman.png",
  "lineal/035-man.png",
  "lineal/036-man.png",
  "lineal/037-man.png",
  "lineal/038-man.png",
  "lineal/039-man.png",
  "lineal/040-man.png",
  "lineal/041-man.png",
  "lineal/042-man.png",
  "lineal/043-woman.png",
  "lineal/044-woman.png",
  "lineal/045-woman.png",
  "lineal/046-woman.png",
  "lineal/047-woman.png",
  "lineal/048-woman.png",
  "lineal/049-woman.png",
  "lineal/050-woman.png",
] as string[];
