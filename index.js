
import pkg from '@faker-js/faker';
const { datatype, name, internet, random, finance } = pkg;
import moment from "moment";

const userProps = [
  'id',
  'firstName',
  'lastName',
  'email',
  'title',
  'numberTransactions',
  'lastTransactionAmount',
  'active',
  'createdDate',
];

const getRandomInt = (min, max) => datatype.number({ min, max });

const getRandomDate = () =>
  moment().subtract(getRandomInt(3650, 7300), 'days').format('MM/DD/YYYY');

const generators = {
  id: { func: datatype.uuid },
  firstName: { func: name.firstName },
  lastName: { func: name.lastName },
  email: { func: internet.email },
  title: { func: random.words, args: 3 },
  numberTransactions: { func: _datatype.number, args: { min: 0, max: 1000 } },
  lastTransactionAmount : { func : finance.amount},
  active: { func: datatype.boolean },
  createdDate: { func: getRandomDate }, 
};

const generate = (props, generators) => {
  const obj = {};
  props.forEach((prop) => {
    const generator = generators[prop];
    obj[prop] = generator.func(generator.args);    
  });
  return obj;
};

const generateUsers = () => {
  const minUsers = 3;
  const maxUsers = 10;
  const len = getRandomInt(minUsers, maxUsers);
  const users = Array.apply(null, Array(len)).map(() =>
    generate(userProps, generators)
  );

  return users;
};

module.exports.users = async (event) => {
  return {
    statusCode : 200,
    body : JSON.stringify(generateUsers(),null,2),
  };
};
