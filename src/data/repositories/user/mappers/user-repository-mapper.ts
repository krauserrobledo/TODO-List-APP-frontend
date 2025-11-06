import { Mapper } from '../../../../base/mapper';
import { UserModel } from '../../../../domain/models/user-model';
import { UserEntity } from '../entities/user-entity';


export class UserImplementationRepositoryMapper extends Mapper<UserEntity, UserModel> {
    mapFrom(param: UserEntity): UserModel {
        return {
            id: param.id,
            username: param.userName,
            email: param.eMail
        };
    }
    mapTo(param: UserModel): UserEntity {
        return {
            id: param.id,
            userName: param.username,
            eMail: param.email
        }
    }
}
