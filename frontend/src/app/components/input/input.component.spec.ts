import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { InputComponent } from './input.component';

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputComponent, FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set input properties correctly', () => {
    component.id = 'test-id';
    component.label = 'Test Label';
    component.type = 'email';
    component.placeholder = 'test@example.com';
    component.errorMessage = 'Campo obrigatório';
    fixture.detectChanges();

    expect(component.id).toBe('test-id');
    expect(component.label).toBe('Test Label');
    expect(component.type).toBe('email');
    expect(component.placeholder).toBe('test@example.com');
    expect(component.errorMessage).toBe('Campo obrigatório');
  });

  it('should implement ControlValueAccessor correctly', () => {
    component.writeValue('test value');
    expect(component.value).toBe('test value');

    component.writeValue('');
    expect(component.value).toBe('');

    const mockFn = jasmine.createSpy('mockFn');
    component.registerOnChange(mockFn);
    component.onChange('test');
    expect(mockFn).toHaveBeenCalledWith('test');

    const touchFn = jasmine.createSpy('touchFn');
    component.registerOnTouched(touchFn);
    component.onTouched();
    expect(touchFn).toHaveBeenCalled();

    component.setDisabledState(true);
    expect(component.disabled).toBeTrue();

    component.setDisabledState(false);
    expect(component.disabled).toBeFalse();
  });

  it('should handle input events correctly', () => {
    spyOn(component, 'onChange');

    const inputEvent = {
      target: {
        value: 'new value',
      },
    } as unknown as Event;

    component.onInput(inputEvent);

    expect(component.value).toBe('new value');
    expect(component.onChange).toHaveBeenCalledWith('new value');
  });

  it('should handle blur events correctly', () => {
    spyOn(component, 'onTouched');
    spyOn(component.blur, 'emit');

    const blurEvent = new FocusEvent('blur');
    component.onBlur(blurEvent);

    expect(component.onTouched).toHaveBeenCalled();
    expect(component.blur.emit).toHaveBeenCalledWith(blurEvent);
  });
});
