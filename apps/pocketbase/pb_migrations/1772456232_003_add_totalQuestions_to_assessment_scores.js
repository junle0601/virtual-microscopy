/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("assessment_scores");

  const existing = collection.fields.getByName("totalQuestions");
  if (existing) {
    if (existing.type === "number") {
      return; // field already exists with correct type, skip
    }
    collection.fields.removeByName("totalQuestions"); // exists with wrong type, remove first
  }

  collection.fields.add(new NumberField({
    name: "totalQuestions"
  }));

  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("assessment_scores");
  collection.fields.removeByName("totalQuestions");
  return app.save(collection);
})