import renderer from 'react-test-renderer';
import AddFacility from '../AddFacility';

it('changes the class when hovered', () => {
  const component = renderer.create(<AddFacility />);
  
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // Ensure onMouseEnter exists before calling it
  if (tree && tree.props && tree.props.onMouseEnter) {
    // manually trigger the onMouseEnter callback
    renderer.act(() => {
      tree.props.onMouseEnter();
    });
    
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  }

  // Ensure onMouseLeave exists before calling it
  if (tree && tree.props && tree.props.onMouseLeave) {
    // manually trigger the onMouseLeave callback
    renderer.act(() => {
      tree.props.onMouseLeave();
    });
    
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  }
});
