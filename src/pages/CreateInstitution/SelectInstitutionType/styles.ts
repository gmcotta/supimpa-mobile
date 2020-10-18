import styled from 'styled-components/native';

type InstitutionTypeButtonProps = {
  selected?: boolean;
};

export const Container = styled.View`
  flex: 1;
  align-items: center;
  padding: 32px;
`;

export const Title = styled.Text`
  font-family: 'Montserrat_700Bold';
  font-size: 32px;
  color: #5c8599;
  text-align: center;
`;

export const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-top: 160px;
`;

export const InstitutionTypeButton = styled.TouchableOpacity<
  InstitutionTypeButtonProps
>`
  padding: 8px;
  width: 160px;
  height: 160px;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  border-color: #5c8599;
  border-width: ${props => (props.selected ? '2px' : '1px')};
  background-color: #fff;
`;

export const InstitutionTypeButtonText = styled.Text<
  InstitutionTypeButtonProps
>`
  font-family: ${props =>
    props.selected ? 'Montserrat_800ExtraBold' : 'Montserrat_600SemiBold'};
  color: #5c8599;
  text-align: center;
  margin-top: 8px;
`;
