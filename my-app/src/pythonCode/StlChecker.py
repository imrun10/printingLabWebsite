import trimesh

def check_stl_file(file_path):
    # Load the STL file
    mesh = trimesh.load_mesh(file_path)

    # Check if the mesh is watertight
    is_watertight = mesh.is_watertight

    # Check if the mesh has any self-intersections
    has_self_intersections = mesh.has_self_intersection()

    # Check if the mesh is valid for 3D printing
    is_valid_for_3d_printing = is_watertight and not has_self_intersections

    # Return the results
    return is_valid_for_3d_printing, is_watertight, has_self_intersections

# Example usage
file_path = 'path/to/your/stl/file.stl'
is_valid, is_watertight, has_self_intersections = check_stl_file(file_path)

if is_valid:
    print("The STL file is ready for 3D printing.")
else:
    if not is_watertight:
        print("The STL file is not watertight.")
    if has_self_intersections:
        print("The STL file has self-intersections and may cause printing issues.")