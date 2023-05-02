import SelectBox from '@toast-ui/select-box';

export default function SelectDropdown() {
    const selectBox = new SelectBox('#select-box', {
      placeholder: 'Please select an option.',
      data: [
        {
          label: 'Fruits',
          data: [
            { label: 'Apple', value: 'apple' },
            { label: 'Banana', value: 'banana' },
          ],
        },
        {
          label: 'The quick brown fox jumps over the lazy dog.',
          value: 'none',
        },
        {
          label: 'Colors',
          data: [
            { label: 'Red', value: 'red' },
            { label: 'Yellow', value: 'yellow' },
            { label: 'Green', value: 'green', disabled: true },
            { label: 'Blue', value: 'blue', disabled: true },
            { label: 'Purple', value: 'purple' },
          ],
        },
      ],
      autofocus: true,
      showIcon: false,
      theme: {
        'common.border': '1px solid black',
        'common.color': 'black',
        'item.highlighted.background': 'yellow',
      },
    });


  const category = [
    { value: 'WARRIOR', label: '참전용사' },
    { value: 'PATIENT', label: '희귀질환' },
    { value: 'SINGLE', label: '미혼모' },
    { value: 'COVID19', label: '코로나19' },
  ];


  return <SelectBox onChange={()=>} options={category}/>;
}
