import { HeroPreviewComponent } from './hero-preview.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { aBombHero } from '../../mocks';

describe('HeroPreviewComponent', () => {
  it('should get the right title', async () => {
    await renderComponent();
    expect(screen.getByText(/A-Bomb/)).toBeInTheDocument();
  });

  it('should contains panels with "Power Stats" panel including', async () => {
    await renderComponent();
    expect(screen.getByRole('tabpanel', { name: 'Power stats' })).toBeInTheDocument();
  });

  it('should dispatch respectively close event and refresh event when click on close and refresh buttons', async () => {
    const closeEvent = jest.fn();
    const refreshEvent = jest.fn();

    await render(HeroPreviewComponent, {
      imports: [NoopAnimationsModule, MatIconModule, MatTabsModule],
      componentProperties: {
        hero: aBombHero,
        closePanel: { emit: closeEvent } as any,
        refresh: { emit: refreshEvent } as any,
      },
    });

    const closeButton = screen.getByRole('close-sidebar-tab');
    await userEvent.click(closeButton);
    expect(closeEvent).toHaveBeenCalled();

    const refreshButton = screen.getByRole('refresh-hero-data');
    await userEvent.click(refreshButton);
    expect(refreshEvent).toHaveBeenCalled();
  });

  async function renderComponent() {
    await render(HeroPreviewComponent, {
      imports: [NoopAnimationsModule, MatIconModule, MatTabsModule],
      componentProperties: { hero: aBombHero },
    });
  }
});
