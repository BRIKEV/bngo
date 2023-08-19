/**
 * User auth request
 * @typedef {object} AuthRequest
 * @property {string} token.required - oauth token
 */

/**
 * JWT access info
 * @typedef {object} UserAuth
 * @property {string} id.required - user's id
 * @property {string | null} firstName.required - user's first name
 * @property {string | null} lastName.required - user's last name
 * @property {string | null} image - user's avatar image
 * @property {string} email.required - user's email
 * @property {string} jwt.required - user's role id
 */

/**
 * User profile info
 * @typedef {object} UserMe
 * @property {string} id.required - user's id
 * @property {string | null} firstName.required - user's first name
 * @property {string | null} lastName.required - user's last name
 * @property {string | null} image - user's avatar image
 * @property {string} email.required - user's email
 */

/**
 * AI limits
 * @typedef {object} IALimits
 * @property {number} chat.required - ai chat count limit
 * @property {number} create.required - ai create count limit
 */

/**
 * User AI usage
 * @typedef {object} UserIAUsage
 * @property {number} count.required - user's ai count used
 * @property {IALimits} limits.required - ai limits
 */

/**
 * User recipe request
 * @typedef {object} RecipeRequest
 * @property {string} title.required - recipe's title
 * @property {string} image - recipe's image
 * @property {string} description.required - recipe's description
 * @property {number} time.required - recipe's time
 * @property {number} servings.required - recipe's servings
 * @property {string[]} ingredients.required - recipe's ingredientes
 */

/**
 * User update recipe request
 * @typedef {object} RecipeUpdateRequest
 * @property {string} title.required - recipe's title
 * @property {string} description.required - recipe's description
 * @property {number} time.required - recipe's time
 * @property {number} servings.required - recipe's servings
 * @property {string[]} ingredients.required - recipe's ingredientes
 */

/**
 * User update recipe request
 * @typedef {object} RecipePreviewImageRequest
 * @property {string} image.required - recipe's title
 */

/**
 * Recipe ingredients
 * @typedef {object} Ingredient
 * @property {string} id.required - Ingredient's id
 * @property {string} name.required - Ingredient's name
 */

/**
 * Recipe author
 * @typedef {object} Author
 * @property {string} id.required - user's id
 * @property {string | null} firstName.required - user's first name
 * @property {string | null} lastName.required - user's last name
 * @property {string | null} image - user's avatar image
 * @property {string} email.required - user's email
 */

/**
 * Preview Image
 * @typedef {object} PreviewImage
 * @property {string} id.required - PreviewImage's id
 * @property {string} name.required - PreviewImage's name
 * @property {string} contentType.required - PreviewImage's contentType
 * @property {boolean} preview - PreviewImage's preview flag
 */

/**
 * User recipe list
 * @typedef {object} RecipeList
 * @property {string} id.required - recipe's title
 * @property {string} title.required - recipe's title
 * @property {string} description.required - recipe's description
 * @property {number} time.required - recipe's time
 * @property {number} servings.required - recipe's servings
 * @property {string} createdAt.required - recipe's creation date
 * @property {PreviewImage | null} image - recipe's image
 * @property {Author} author.required - recipe's author
 */

/**
 * User recipe
 * @typedef {object} RecipeResponse
 * @property {string} id.required - recipe's id
 * @property {string} title.required - recipe's title
 * @property {PreviewImage | null} image.required - recipe's image
 * @property {string} description.required - recipe's description
 * @property {number} time.required - recipe's time
 * @property {number} servings.required - recipe's servings
 * @property {string} createdAt.required - recipe's creation date
 * @property {Ingredient[]} ingredients.required - recipe's ingredients
 * @property {Author} author.required - recipe's author
 */

/**
 * User recipe list response
 * @typedef {object} RecipesResponse
 * @property {RecipeList[]} docs.required - list of recipes
 * @property {number} total.required - total recipes
 * @property {number} size.required - page size
 * @property {number} page.required - current page
 * @property {number} pages.required - number of pages
 */



/**
 * File response
 * @typedef {object} FileResponse
 * @property {string} id.required - file id
 */

/**
 * File response
 * @typedef {object} FileRequest
 * @property {object} file.required - file id
 */

/**
 * AIRequest to generate a recipe
 * @typedef {object} AIRequest
 * @property {string} title.required - recipe title
 * @property {number} servings.required - recipe's servings
 */

/**
 * Recipe AI ingredients
 * @typedef {object} AIIngredient
 * @property {string} name.required - Ingredient's name
 */

/**
 * Text about a recipe with the chatbot
 * @typedef {object} AIConversationRequest
 * @property {string} message.required - message of the recipe
 */

/**
 * AI message list
 * @typedef {object} AIMessageContent
 * @property {string} content.required - message info
 * @property {string} role - message role
 */

/**
 * AI message list
 * @typedef {object} AIMessage
 * @property {string} type.required - type of message origin human or ia
 * @property {AIMessageContent} data.required - message info
 */

/**
 * Text about a recipe with the chatbot
 * @typedef {object} AIConversationResponse
 * @property {string} message.required - message of the recipe
 * @property {AIMessage[]} messages.required - message of the recipe
 */

/**
 * AU recipe
 * @typedef {object} AIRecipeResponse
 * @property {string} description.required - recipe's description
 * @property {number} time.required - recipe's time
 * @property {AIIngredient[]} ingredients.required - recipe's ingredients
 */