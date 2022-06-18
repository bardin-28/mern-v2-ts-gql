import resolvers from './resolvers';
import indexType from './typedefs/index'
import userType from "./typedefs/user";

const schema = {
    typeDefs: [ indexType, userType ],
    resolvers,
};

export default schema
