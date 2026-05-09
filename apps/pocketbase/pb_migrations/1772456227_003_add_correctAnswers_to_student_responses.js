/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("student_responses");

  const existing = collection.fields.getByName("correctAnswers");
  if (existing) {
    if (existing.type === "number") {
      return; // field already exists with correct type, skip
    }
    collection.fields.removeByName("correctAnswers"); // exists with wrong type, remove first
  }

  collection.fields.add(new NumberField({
    name: "correctAnswers"
  }));

  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("student_responses");
  collection.fields.removeByName("correctAnswers");
  return app.save(collection);
})