export function checkMissingParametersRequests(sentFields: any, requiredFieldsArr: string[]){

  const remainingRequiredFieldsArr = [...requiredFieldsArr];

  Object.keys(sentFields).forEach((fieldName: string) => {
    const fieldIndex = remainingRequiredFieldsArr.indexOf(fieldName);
    if (fieldIndex > -1) {
      remainingRequiredFieldsArr.splice(fieldIndex, 1);
    }
  });

  if (remainingRequiredFieldsArr.length > 0){
    return  `There are missing field parameters: ${remainingRequiredFieldsArr}`;
  }
}
