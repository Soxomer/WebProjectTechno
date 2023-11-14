import {ArgumentMetadata, BadRequestException, Injectable, PipeTransform,} from "@nestjs/common";
import {User} from "../../users/entities/user.entity";

@Injectable()
export class VinciEmailPipe implements PipeTransform {
  transform(value: User, metadata: ArgumentMetadata) {
    const { name, firstName, email } = value;

    const emailRegex = new RegExp(
      `^${name.toLowerCase()}\\.${firstName.toLowerCase()}@(student\\.)?vinci\\.be$`,
    );
    if (!emailRegex.test(email.toLowerCase())) {
      throw new BadRequestException(email + " is not a valid vinci email");
    }
    return value;
  }
}
