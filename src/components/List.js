import React from 'react'
import { Item } from './Item'

// type ListProps = {
//   lists: Array<any>,
// }
const List = ({ lists, onRemoveItem }) =>
  lists.map((item) => (
    <Item key={item.objectID} item={item} onRemoveItem={onRemoveItem} />
  ))
// <div>
//   {lists.map((item) => (
//     <div key={item.objectID}>
//       <span>
//         <a href={item.url}>{item.title}</a>
//       </span>
//       <span>{item.author}</span>
//       <span>{item.num_comments}</span>
//       <span>{item.points}</span>
//     </div>
//   ))}

//   {/* return list.map((item) => {
//     return item.going === true ? (
//       <div key={item.objectID}>
//         <span>
//           <a href={item.url}>{item.title}</a>
//         </span>
//         <span>{item.author}</span>
//         <span>{item.num_comments}</span>
//         <span>{item.points}</span>
//       </div>
//     ) : null
//   }) */}
//   {/*
//   {list.map((item) => {
//     return null
//   })} */}
// </div>

// }
export default List
