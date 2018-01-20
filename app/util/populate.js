import Meteor from 'react-native-meteor';
import fields from './fields';

const PopulateUtil = {
    group(group) {
        if (group) {
            group.members = Meteor.collection('users').find({ _id: { $in: group.members } });
            group.admin = Meteor.collection('users').findOne({ _id: group.admin });
        }
    },
    groups(groups) {
        groups.forEach(group => PopulateUtil.group(group));
    },
    file(file) {
        if (file) {
            return Meteor.collection('files').findOne({ _id: file });
        }
    },
    user(user) {
        if (user) {
            return Meteor.collection('users').findOne({ _id: user });
        }
    },
    message(messageFrom) {
        if (messageFrom) {
            return Meteor.collection('users').findOne(
                { _id: messageFrom },
                {
                    fields: fields.user,
                },
            );
        }
    },
    company(companyId) {
        if (companyId) {
            return Meteor.collection('company').findOne(
                { _id: companyId },
                {
                    fields: fields.companyName,
                },
            );
        }
    },
};

export default PopulateUtil;
