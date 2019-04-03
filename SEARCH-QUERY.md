# SEARCH-QUERY

This file is the specification for the query languge used in the research bar

## Basic query

The differents filter functions needs to be separate by a space characters. If non-keyword terms are passed, a match will be done on the names. For an entry to be selected, it must meet all the filter fonction.


## Keywords

All the words begining by the `@` character are considered as a keywords that will call a special filter function.

For example `@jobs:Gatherer,Knight` will call the `jobs` filter function with the arguments `Gatherer` and `Knight`

The current supported keyword are:

| Keyword | Arguments | Description | Example |
| ------- | -------- | ----------- | ------- |
| `@pos`  | `{x: integer}/{y: integer}` | Will filter for the entries at the position x,y | `@pos:10/10` |
| `@jobs` | `{string}[,{string}]` * | Will filter for the entries that will have ALL the precised jobs | `@jobs:Gatherer,Knight` |
| `@items` | `{string}[,{string}]` * **| Will filter for the entries that will have ALL the precised items | `@items:Iron-Shield,Food,Wood` |

\* The case is ignored

\** The space character in items name need to be replace by a `-` in the query

## Example

`Gregoire @jobs:Gatherer`: It will match all characters that have `Gregoire` in their name AND that have the `Gatherer` job