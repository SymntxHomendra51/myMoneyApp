import { getTemplatesItem } from '@/DB/services/templateService'
import {
  ActionSheetOptions,
  ActionSheetProps,
  useActionSheet,
} from '@expo/react-native-action-sheet'
import { range } from 'lodash'

const getTemplateList = async () => {
  const templateListRange = range(10)

  const dbList = await getTemplatesItem()
  console.log('dblist ', dbList)

  const list = templateListRange.map(id => {
    const result = dbList.find(tl => tl.temp_id == id) ?? { temp_id: id }
    if (result.temp_json) {
      const json = JSON.parse(result.temp_json)
      return {
        temp_id: id,
        label: `Account ${json.r_from_ac_type_id} to ${json.r_to_ac_type_id}`,
      }
    } else return { temp_id: id, label: 'Empty' }
  })
  return list
}

const showTemplateList = async (
  tapAction: (arg0: any) => any,
  showActionSheetWithOptions,
) => {
  const tempList = await getTemplateList()
  tempList.push({ label: 'Cancel' })
  console.log('templist', tempList)
  showActionSheetWithOptions(
    {
      // title: 'Save',
      options: tempList?.map(item => item.label),
      cancelButtonIndex: tempList?.length - 1,
      // destructiveButtonIndex: options?.length,
      destructiveColor: 'red',
      showSeparators: true,
      containerStyle: {
        maxHeight: '90%',
      },
    },
    async index => {
      console.log(tempList[index])
      if (tempList[index]?.temp_id >= 0)
        await tapAction(tempList[index]?.temp_id)
    },
  )
}

export default showTemplateList
