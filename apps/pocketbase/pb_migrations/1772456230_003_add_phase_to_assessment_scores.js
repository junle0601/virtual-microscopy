/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("assessment_scores");

  const existing = collection.fields.getByName("phase");
  if (existing) {
    if (existing.type === "text") {
      return; // field already exists with correct type, skip
    }
    collection.fields.removeByName("phase"); // exists with wrong type, remove first
  }

  collection.fields.add(new TextField({
    name: "phase"
  }));

  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("assessment_scores");
  collection.fields.removeByName("phase");
  return app.save(collection);
})