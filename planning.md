# Fruits API

User stories: (`As a user ...`)
- create a fruit
    - new schema
    - create a model to use
    - return a newly created fruit
- view all fruits
    - query all fruits in collection - find()?
    - return  all fruits
- view a single fruit
    - query for a single fruit - by ID?
    - return single correct fruit
- update a single fruit
    - query for a single fruit - by ID?
    - update that single fruit
    - return updated fruit
- delete a single fruit
    - query for a single fruit - by ID?
    - delete or remove fruit
    - return a success of some kind
- be able to delete all fruits
    - default value of some kind - should start at 0
    - query for a single fruit - by ID?
    - update liked field
    - return updated document
- automatically delete fruits a week after their creation
    - query for a all fruits - by ID?
    - delete fruits createdAt farther back than one week

Schema: (model)
- fruit
    - name - string
    - color - string
    - readyToEat - boolean
    - timestamps - new Date