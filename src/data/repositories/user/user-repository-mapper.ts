import { Mapper } from './../../../base/utils/mapper';
import { UserEntity } from './../../../domain/entities/user-entity';
import { UserModel } from '../../models/user-model';


export class UserImplementationRepositoryMapper extends Mapper<UserModel, UserEntity> {
    mapFrom(param: UserModel): UserEntity {
        return {
            id: param.id,
            username: param.username,
            email: param.eMail
        };
    }
    mapTo(param: UserEntity): UserModel {
        return {
            id: param.id,
            username: param.username,
            eMail: param.email
        }
    }
}
