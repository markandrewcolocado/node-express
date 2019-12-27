const express = require('express');
const uuid = require('uuid');
const apiRouter = express.Router();
const members = require('../../Members');

// Gets all members
apiRouter.get('/', (req, res) => res.json(members));

// Get single member
apiRouter.get('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id, 10));
    if (found) {
        res.json(members.filter(member => member.id === parseInt(req.params.id, 10)));
    } else {
        res.status(400).json({msg: `No member with the id of ${req.params.id}`})
    }
});

// Create member
apiRouter.post('/', (req, res) => {
    // res.send(req.body);
    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: 'active'
    };

    // Check if name and email exists
    if (!newMember.name || !newMember.email) {
        return res.status(400).json({msg: 'Please include a name and email.'});
    }

    members.push(newMember);
    res.json(members);
    // res.redirect('/');
});

// Update member
apiRouter.put('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id, 10));
    if (found) {
        const updateMember = req.body;
        members.forEach(member => {
            if (member.id === parseInt(req.params.id, 10)) {
                member.name = updateMember.name ? updateMember.name : member.name;
                member.email = updateMember.email ? updateMember.email : member.email;
                res.json({msg: 'Member updated:', member})
            }
        });
    } else {
        res.status(400).json({msg: `No member with the id of ${req.params.id}`});
    }
});

// Delete member
apiRouter.delete('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id, 10));
    if (found) {
        res.json({
            msg: 'Member deleted.',
            members: members.filter(member => member.id !== parseInt(req.params.id, 10))
        });
    } else {
        res.status(400).json({msg: `No member with the id of ${req.params.id}`})
    }
});

module.exports = apiRouter;