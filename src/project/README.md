Developer <---> Project (MANY TO MANY)

One Developer can work on many Projects
One Project can have many Developers



WHY NOT EMBEDDING?

Problems:
Data duplication → same project stored many times.
Update issues → changing project title requires updating every copy.
Large documents → documents keep growing.
Many-to-many relationships don't fit embedding well.