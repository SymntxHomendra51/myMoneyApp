const addToArr = (arr, id, amount, name) => {
  const resIndex = arr.findIndex(o => o.id == id)
  if (resIndex > -1) {
    arr[resIndex].bal += amount
  } else {
    arr.push({ id, bal: amount, acName: name })
  }
}

const handleTransaction = (tempArr, object) => {
  const fResult = tempArr.findIndex(i => i.ac_type_id == object.ac_from_type_id)

  if (fResult > -1) {
    tempArr[fResult].amount -= object.r_amount
    /* tempArr[fResult].acArray.push({acName: object.ac_from_name, bal: 0-object.r_amount}) */
    addToArr(
      tempArr[fResult].acArray,
      object.r_from_ac_id,
      -object.r_amount,
      object.ac_from_name,
    )
  } else {
    const newObj = {
      ac_type_id: object.ac_from_type_id,
      amount: 0 - object.r_amount,
      acArray: [
        {
          acName: object.ac_from_name,
          bal: 0 - object.r_amount,
          id: object.r_from_ac_id,
        },
      ],
    }
    tempArr.push(newObj)
  }

  const tFResult = tempArr.findIndex(i => i.ac_type_id == object.ac_to_type_id)
  if (tFResult > -1) {
    tempArr[tFResult].amount += object.r_amount
    /* tempArr[tFResult].acArray.push({acName: object.ac_to_name, bal: object.r_amount}) */
    addToArr(
      tempArr[tFResult].acArray,
      object.r_to_ac_id,
      object.r_amount,
      object.ac_to_name,
    )
  } else {
    const newObj = {
      ac_type_id: object.ac_to_type_id,
      amount: object.r_amount,
      acArray: [
        {
          acName: object.ac_from_name,
          bal: object.r_amount,
          id: object.r_to_ac_id,
        },
      ],
    }
    tempArr.push(newObj)
  }

  return tempArr
}

export const calcBalance = (objArr: Array<{}>) => {
  const tempArr: Array<{ ac_type_id: number; acArray: Array<{}> }> = []

  objArr.forEach(obj => handleTransaction(tempArr, obj))

  return tempArr
}
