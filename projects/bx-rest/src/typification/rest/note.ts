/** Parameters for note methods that return an item by ID. */
export interface iBXRestParamNoteGet {
  id: number
}

/** Parameters for `note.file.get`. */
export interface iBXRestParamNoteFileGet extends iBXRestParamNoteGet {
  documentId: number
}

/** Parameters for note field-description methods. */
export type iBXRestNoteCollectionFieldName =
  | 'id'
  | 'name'
  | 'position'
  | 'policyLevel'
  | 'accessLevel'
  | 'state'
  | 'isArchived'
  | 'markdownDescription'
  | 'createdBy'
  | 'createdAt'
  | 'updatedBy'
  | 'updatedAt'
  | (string & {})

export type iBXRestNoteCollectionFieldSelect =
  | 'name'
  | 'type'
  | 'title'
  | 'description'
  | 'validationRules'
  | 'requiredGroups'
  | 'filterable'
  | 'sortable'
  | 'editable'
  | 'editableGroups'
  | 'multiple'
  | 'elementType'
  | (string & {})

export type iBXRestNoteDocumentSearchFieldName =
  | 'documentId'
  | 'collectionId'
  | 'query'
  | 'title'
  | 'score'
  | 'snippet'
  | 'sharedAccess'
  | (string & {})

export type iBXRestNoteDocumentTreeFieldName =
  | 'id'
  | 'collectionId'
  | 'parentId'
  | 'title'
  | 'position'
  | 'children'
  | (string & {})

export type iBXRestNoteFileFieldName =
  | 'id'
  | 'documentId'
  | 'name'
  | 'size'
  | 'mimeType'
  | 'assetType'
  | 'assetMarkdown'
  | (string & {})

export interface iBXRestParamNoteFieldGet<
  TName extends string = string,
  TSelect extends string = string
> {
  name: TName
  select?: TSelect[]
}

/** Parameters for `note.document.search.list`. */
export interface iBXRestParamNoteDocumentSearchList {
  query: string
  pagination?: {
    limit?: number
  }
}

/** Parameters for `note.document.tree.list`. */
export interface iBXRestParamNoteDocumentTreeList {
  collectionId: number
}
