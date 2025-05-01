import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader } from '@/components/ui/sidebar'
import { SidebarItem } from './SidebarItem'
import { bookNavItems } from './nav-item'

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarItem items={bookNavItems} />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}
